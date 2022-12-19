export const theme = {
  global: {
    hover: {
      color: "#eee",
      background: {
        color: "#7D4CDB",
        opacity: 1
      }
    },
    colors: {
      focus: "#7D4CDB",
      control: "#7D4CDB"
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
  card: {
    container : {
      background: "#333333",
      pad: "medium"
    }
  },
  select: {
    options: {
      container: {
        background: {
          color: "dark-1",
          dark: true,
          opacity: "strong"
        }
      }
    },
  },
  calendar: {
    extend: `background: 'blue !important'`,
    day: {
      extend: `background: 'blue !important'`
    },
  },
  table: {
    header: {
      pad: "medium"
    },
  }
};