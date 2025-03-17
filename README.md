# Charlotte Hornets Player Insights Dashboard

A modern, interactive dashboard built with Next.js and TypeScript that provides comprehensive statistics and insights for the Charlotte Hornets' 2023-24 NBA season.

## Features

### Season Statistics Table
- Complete player statistics including points, rebounds, assists, FG%, and minutes
- Sortable columns for easy comparison
- Responsive design with horizontal scrolling for mobile devices

### Player Performance Analytics
- Interactive player leaderboard with top performers in various categories
- Performance radar chart showing individual player statistics
- Points distribution visualization
- Shooting efficiency comparisons

### Team Overview
- Team-wide statistics and averages
- Quick view of season leaders in key categories
- Real-time data updates

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Data**: Integration with NBA statistics API

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/player-insights.git
cd player-insights
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Add your API keys and configuration values to `.env.local`

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── api/           # API routes
│   ├── components/    # React components
│   ├── types/        # TypeScript types
│   ├── utils/        # Utility functions
│   └── dashboard/    # Dashboard page
├── components/
│   └── ui/           # Reusable UI components
└── lib/              # Shared libraries
```

## Features in Detail

### Season Statistics
- Complete season statistics for all active roster players
- Sortable columns for all statistical categories
- Sticky header for better navigation
- Responsive table with horizontal scroll

### Player Leaderboard
- Top 5 players in each statistical category
- Tabbed interface for easy category switching
- Real-time updates as data changes

### Performance Visualizations
- Radar charts for individual player analysis
- Distribution charts for team-wide comparisons
- Shooting efficiency scatter plots

### Team Overview
- Quick statistics panel
- Season averages and totals
- Top performer highlights

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Data provided by NBA Statistics API
- Design inspiration from NBA.com
- Built with shadcn/ui components
