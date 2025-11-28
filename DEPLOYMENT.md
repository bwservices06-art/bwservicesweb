# Deployment Guide for Vercel

Follow these steps to deploy your Next.js portfolio to Vercel.

## Prerequisites

1.  A [GitHub](https://github.com/) account.
2.  A [Vercel](https://vercel.com/) account (you can sign up using GitHub).
3.  Your Firebase configuration keys (from `lib/firebase.ts`).

## Step 1: Push to GitHub

If you haven't already pushed your code to GitHub, do so now:

1.  Initialize Git (if not already done):
    ```bash
    git init
    ```
2.  Add all files:
    ```bash
    git add .
    ```
3.  Commit changes:
    ```bash
    git commit -m "Ready for deployment"
    ```
4.  Create a new repository on GitHub.
5.  Link your local repository to GitHub and push:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git branch -M main
    git push -u origin main
    ```

## Step 2: Deploy on Vercel

1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Import your GitHub repository (`portfolio-site`).
4.  Vercel will automatically detect that it's a Next.js project.

## Step 3: Configure Environment Variables (Optional but Recommended)

For better security, you should use Environment Variables instead of hardcoding Firebase keys in `lib/firebase.ts`.

1.  In the Vercel deployment screen, expand the **"Environment Variables"** section.
2.  Add the following variables (copy values from your `lib/firebase.ts`):
    *   `NEXT_PUBLIC_FIREBASE_API_KEY`
    *   `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
    *   `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
    *   `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
    *   `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
    *   `NEXT_PUBLIC_FIREBASE_APP_ID`
    *   `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

    *Note: You will need to update your `lib/firebase.ts` to use `process.env.NEXT_PUBLIC_...` if you do this.*

## Step 4: Deploy

1.  Click **"Deploy"**.
2.  Wait for the build to complete.
3.  Once finished, you will get a live URL (e.g., `https://your-project.vercel.app`).

## Troubleshooting

*   **Build Errors:** If the build fails, check the "Logs" tab in Vercel. Common issues include TypeScript errors or missing dependencies.
*   **Images Not Loading:** Ensure all external image domains are listed in `next.config.ts`.
