# Deploying Kuvalaya-mālā to Vercel

Since your project is built with Next.js, **Vercel** is the easiest and best place to deploy it.

## Option 1: The Easy Way (Web Dashboard)

1.  **Go to Vercel**: Visit [vercel.com](https://vercel.com) and Sign Up / Login (log in with your **GitHub** account).
2.  **Add New Project**:
    *   Click the **"Add New..."** button.
    *   Select **"Project"**.
3.  **Import Git Repository**:
    *   You should see your `AdityaHirekar/kuvalyamala` repository in the list.
    *   Click **"Import"** next to it.
4.  **Configure Project**:
    *   **Framework Preset**: It should auto-detect "Next.js".
    *   **Root Directory**: Leave as `./`.
    *   **Build Command**: Leave default (`next build`).
    *   **Environment Variables**: You don't have any strictly required ones for this static site unless you added analytics.
5.  **Deploy**:
    *   Click **"Deploy"**.
    *   Wait about 1-2 minutes. Vercel will build your site, run the optimizations, and assign a domain (e.g., `kuvalyamala.vercel.app`).

## Option 2: The Hacker Way (Command Line)

If you prefer using the terminal:

1.  Install Vercel CLI:
    ```bash
    npm i -g vercel
    ```
2.  Login:
    ```bash
    vercel login
    ```
3.  Deploy:
    ```bash
    vercel
    ```
    *   Follow the prompts (say `Y` to everything).
4.  Production Deploy:
    ```bash
    vercel --prod
    ```

## Post-Deployment Checks

*   **Audio/Images**: Check that your `intro.mp3` and chapter images load correctly.
*   **Responsiveness**: Open the link on your phone to verify the mobile layout.
