## Portfolio

This is a personal portfolio project built with TypeScript, React, and Next.js. The project includes a contact form that
integrates with Arcjet for email validation and rate limiting, and sends messages to a Discord webhook.

### Features

- **TypeScript**: Strongly typed code for better maintainability and fewer runtime errors.
- **React**: Component-based architecture for building the user interface.
- **Next.js**: Server-side rendering and API routes.
- **Arcjet**: Email validation and rate limiting.
- **Discord Webhook**: Sends contact form messages to a Discord channel.

### Sections

- **Hero Section**: Introduction and links to social profiles.
- **About Me Section**: Information about the developer and their toolbox.
- **Projects Section**: Showcases featured projects.
- **Contact Section**: Contact form for getting in touch.

### Getting Started

#### Prerequisites

- Node.js (>= 18.x)
- npm (>= 6.x)

#### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/TheRealMangoAPI/portfolio.git
    cd portfolio
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env.local` file in the root directory and add your environment variables:
    ```dotenv
    ARCJET_KEY=your_arcjet_key
    DISCORD_WEBHOOK_URL=your_discord_webhook_url
    ```

#### Running the Development Server

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Project Structure

- `src/`: Contains the source code.
    - `components/`: React components.
        - `sections/`: Section components like `HeroSection`, `AboutMeSection`, `ProjectsSection`, and `ContactSection`.
    - `app/`: Next.js routes.
        - `api/contact/route.ts`: API route for handling contact form submissions.
    - `schemas/`: Zod schemas for form validation.
    - `env.ts`: Environment variable validation using Zod.
    - `data/`: Contains data for navigation, projects, and social links.

### Sections Details

#### Hero Section

The `HeroSection` component introduces the developer and provides links to social profiles. It is located
in `src/components/sections/HeroSection.tsx`.

#### About Me Section

The `AboutMeSection` component provides information about the developer and their toolbox. It is located
in `src/components/sections/AboutMeSection.tsx`.

#### Projects Section

The `ProjectsSection` component showcases featured projects. It is located
in `src/components/sections/ProjectsSection.tsx`.

#### Contact Section

The `ContactSection` component includes a contact form for getting in touch. It is located
in `src/components/sections/ContactSection.tsx`. It uses `react-hook-form` for form handling and `zod` for schema
validation.

### API Route

The API route for the contact form is located in `src/app/api/contact/route.ts`. It uses Arcjet for email validation and
rate limiting, and sends messages to a Discord webhook.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request.

### License

This project is licensed under the MIT License. See the `LICENSE` file for more details.