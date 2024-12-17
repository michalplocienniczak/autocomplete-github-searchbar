# Github Autocomplete Search

## Overview

Github Autocomplete Search is a lightweight, performant React-based project that enables users to search for Github repositories and profiles seamlessly. The application uses Github's REST API, providing a user-friendly autocomplete component built from scratch. The project adheres to modern development practices and includes thorough testing.

## Features

- **Custom Autocomplete**: A fully custom autocomplete solution built without existing libraries.
- **Minimal Input**: Search initializes after entering at least 3 characters.
- **Alphabetical Sorting**: Results are sorted alphabetically by repository and profile name.
- **Result Limitation**: A maximum of 50 results per request to optimize performance.
- **Feedback States**: Visual feedback for loading, empty results, and errors.
- **Keyboard Navigation**: Use arrow keys to navigate and Enter to open links in new tabs.
- **Dark Mode**: Supports dark mode for a better user experience in low-light environments.
- **Responsive Design**: Fully responsive layout for optimal use on devices of all sizes.
- **Test Coverage**: Includes meaningful unit and integration tests.

## Tech Stack

The project is built using:

- **React**: Component-based UI development.
- **Vite**: Fast build tool for modern web projects.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Vitest**: Blazing fast testing framework.
- **Octokit**: Github API client.
- **Tanstack Query**: React Query for efficient data fetching and caching.
- **Query Key Factory**: Utility for consistent and reusable query keys.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/michalplocienniczak/github-autocomplete-search.git
   cd github-autocomplete-search
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Run tests:

   ```bash
   npm test
   ```

## Usage

Enter a minimum of 3 characters in the search bar to fetch autocomplete results. Navigate using the keyboard or mouse, and select an option to open its Github page in a new tab.

https://github.com/user-attachments/assets/ac504331-9757-438e-9b39-c40651b1b51c


