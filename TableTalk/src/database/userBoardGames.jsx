import CatanImage from "../assets/gameImages/Catan.jpeg";
import TicketToRideImage from "../assets/gameImages/ticketToRide.jpg";
import GloomhavenImage from "../assets/gameImages/gloomhaven.jpg";
import AzulImage from "../assets/gameImages/azul.webp";

const userBoardGames = [
  {
      name: "Catan",
      type: "Area Control",
      objective: "Casual",
      likes: 1200,
      maxPlayers: 4,
      image: CatanImage,
      duration: "Long (1-2 hours)",
      complexity: "Medium",
      description: "Catan is a strategy board game where players collect and trade resources to build roads, settlements, and cities to earn victory points.",
      rules: "Players roll dice to collect resources, trade with others, and build structures to expand their settlements. The first player to reach 10 points wins.",
      reviews: [
        {
          text: "The perfect gateway game! Introduced all my friends to modern board gaming with this. The trading mechanic creates great player interaction.",
          author: "Sarah T.",
          rating: 5,
          date: "2023-10-15"
        },
        {
          text: "Gets repetitive after many plays. The initial strategy is always the same - go for wheat and ore.",
          author: "Michael R.",
          rating: 3,
          date: "2023-09-22"
        },
        {
          text: "Our family favorite! We've played over 50 games and it never gets old. The expansions add great variety.",
          author: "The Johnson Family",
          rating: 5,
          date: "2023-11-05"
        }
      ]
    },
  {
      name: "Ticket to Ride",
      type: "Area Control",
      objective: "Casual",
      likes: 950,
      maxPlayers: 4,
      image: TicketToRideImage,
      duration: "Extended (2 hours+)",
      complexity: "Light",
      description: "A railway-themed board game where players collect train cards to claim railway routes and complete destination tickets.",
      rules: "Players draw cards and claim routes on the board. Longer routes and completed tickets score higher points.",
      reviews: [
        {
          text: "Simple to learn but surprisingly strategic. The tension of blocking opponents while completing your own routes is fantastic.",
          author: "David L.",
          rating: 5,
          date: "2023-08-14"
        },
        {
          text: "Great for casual play but lacks depth for serious gamers. The Europe version improves on the original.",
          author: "Emma K.",
          rating: 4,
          date: "2023-07-30"
        }
      ]
    },
  {
      name: "Gloomhaven",
      type: "Strategy",
      objective: "Competitive",
      likes: 800,
      maxPlayers: 4,
      image: GloomhavenImage,
      duration: "Medium (30 - 60 mins)",
      complexity: "Heavy",
      description: "A cooperative campaign-driven dungeon crawler with evolving storylines and character progression.",
      rules: "Players use cards to control actions, complete scenarios, and unlock new quests. Combat is turn-based and cooperative.",
      reviews: [
        {
          text: "The most immersive board game experience I've ever had. The campaign progression and character development is unmatched.",
          author: "Robert G.",
          rating: 5,
          date: "2023-09-18"
        },
        {
          text: "Incredible but overwhelming. Setup takes forever and the rules are complex. Best for dedicated groups.",
          author: "Lisa M.",
          rating: 4,
          date: "2023-10-02"
        },
        {
          text: "Worth every penny. We've played 40 scenarios and still have content left. The card combat system is genius.",
          author: "The Wilson Party",
          rating: 5,
          date: "2023-11-12"
        }
      ]
    },
  {
      name: "Azul",
      type: "Abstract Strategy",
      objective: "Casual",
      likes: 880,
      maxPlayers: 4,
      image: AzulImage,
      duration: "Short (<30 mins)",
      complexity: "Light",
      description: "A tile-laying game where players draft colorful tiles to complete patterns and score points.",
      rules: "Players take turns selecting tiles and placing them on their boards, trying to maximize points through strategic placement.",
      reviews: [
        {
          text: "Gorgeous components and satisfying gameplay. Easy to teach but has surprising depth. Our most played game of 2023!",
          author: "Artistic Amy",
          rating: 5,
          date: "2023-10-22"
        },
        {
          text: "The tile-drafting mechanic is brilliant but can be punishing if you don't plan ahead. Not for the faint of heart!",
          author: "Careful Chris",
          rating: 4,
          date: "2023-09-14"
        }
      ]
    },
];

export default userBoardGames;