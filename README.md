# Kuvalaya-mālā Interactive Experience

An educational website for the 8th-century IKS text "Kuvalaya-mālā". Built with Next.js, Tailwind CSS, and Framer Motion.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-repo/kuvalyamala.git
    cd kuvalyamala
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    npm install --legacy-peer-deps
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📂 Project Structure

-   `src/components/ui/`: Reusable UI components (Button, Card, Modal, Section).
-   `src/components/sections/`: Page sections (Hero, Story, Knowledge, etc.).
-   `src/app/globals.css`: Global styles, colors, and fonts configuration.

## 🎨 Customization

### text content
Edit the files in `src/components/sections/` to update text content. Data is often stored in arrays at the top of the component files (e.g., `storySteps` in `Story.tsx`).

### Audio & Narrations (New)
The project supports a 10-minute self-narrated experience.
-   **Audio Files**: Place MP3 files in `public/audio/`.
-   **File Naming**:
    -   Intro: `intro.mp3`
    -   Chapters: `chapter-1.mp3`, `chapter-2.mp3`, etc.
-   **Recording**: Ensure audio is compressed (MP3, 128kbps) for fast loading.
-   **Controls**:
    -   **Play**: Click the circular play button next to chapter titles.
    -   **Global Mute**: Use the floating speaker icon (bottom-right) to mute all audio instantly.

### Colors & Fonts
Theme is configured in `src/app/globals.css`.
-   `--color-paper`: Background color
-   `--color-ink`: Primary text color
-   `--color-maroon`: Primary accent

## 📦 Deployment

The app is ready for Vercel.
1.  Push to GitHub.
2.  Import project in Vercel.
3.  Deploy.
