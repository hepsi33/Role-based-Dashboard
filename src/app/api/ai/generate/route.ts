import { NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";
import { model } from "@/lib/gemini";
import { auth } from "@/lib/auth";

// Function to extract video ID from various YouTube URL formats
function extractVideoId(url: string) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

export async function POST(req: Request) {
    try {
        // Authenticate user
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { videoUrl } = await req.json();

        if (!videoUrl) {
            return NextResponse.json({ error: "Video URL is required" }, { status: 400 });
        }

        const videoId = extractVideoId(videoUrl);
        if (!videoId) {
            return NextResponse.json({ error: "Invalid YouTube URL" }, { status: 400 });
        }

        // Fetch transcript
        let transcriptText = "";
        try {
            const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);
            transcriptText = transcriptItems.map(item => item.text).join(" ");
        } catch (error) {
            console.error("Transcript Error:", error);
            return NextResponse.json({ error: "Could not fetch transcript. The video might not have captions." }, { status: 400 });
        }

        // Generate study notes using Gemini
        const prompt = `
        You are an expert tutor. Create comprehensive study notes based on the following YouTube video transcript.

        Strictly follow this structure:
        ## 📌 Overview
        (A brief summary of the video's main topic)

        ## 🔑 Key Concepts
        (List the most important ideas discussed)
        - **Concept 1:** Explanation...
        - **Concept 2:** Explanation...

        ## 📝 Detailed Notes
        (Break down the content into logical sections with headings)

        ## 🧠 Quiz Issues
        (Generate 3 short quiz questions to test understanding)

        ---
        **Transcript:**
        ${transcriptText.substring(0, 25000)} 
        // Truncate to avoid token limits if necessary, though Gemini Pro handles large context well.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const notes = response.text();

        return NextResponse.json({ notes });

    } catch (error) {
        console.error("AI Generation Error:", error);
        return NextResponse.json({ error: "Failed to generate study notes" }, { status: 500 });
    }
}
