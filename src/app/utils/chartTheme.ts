// Color palette
export const colors = {
  primary: {
    main: '#1d4ed8', // Blue
    light: '#60a5fa',
    dark: '#1e40af',
  },
  secondary: {
    main: '#7c3aed', // Purple
    light: '#a78bfa',
    dark: '#5b21b6',
  },
  accent: {
    main: '#059669', // Green
    light: '#34d399',
    dark: '#047857',
  },
  neutral: {
    main: '#6b7280',
    light: '#9ca3af',
    dark: '#4b5563',
  },
};

// Shared chart options
export const baseChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        padding: 20,
        font: {
          size: 12,
          weight: 'bold' as const,
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(17, 24, 39, 0.8)',
      padding: 12,
      titleFont: {
        size: 14,
        weight: 'bold' as const,
      },
      bodyFont: {
        size: 13,
      },
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
    },
  },
  scales: {
    r: {
      grid: {
        color: 'rgba(203, 213, 225, 0.3)',
      },
      angleLines: {
        color: 'rgba(203, 213, 225, 0.3)',
      },
      pointLabels: {
        font: {
          size: 12,
          weight: 'bold' as const,
        },
      },
      ticks: {
        backdropColor: 'transparent',
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 11,
        },
      },
    },
    y: {
      grid: {
        color: 'rgba(203, 213, 225, 0.2)',
      },
      ticks: {
        font: {
          size: 11,
        },
      },
    },
  },
}; 