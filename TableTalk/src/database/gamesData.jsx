import CatanImage from "../assets/gameImages/placeholder.webp";
import TicketToRideImage from "../assets/gameImages/placeholder.webp";
import GloomhavenImage from "../assets/gameImages/placeholder.webp";
import ChessImage from "../assets/gameImages/placeholder.webp";
import ExplodingKittensImage from "../assets/gameImages/placeholder.webp";
import ClueImage from "../assets/gameImages/placeholder.webp";
import PandemicImage from "../assets/gameImages/placeholder.webp";
import MonopolyImage from "../assets/gameImages/placeholder.webp";
import DominionImage from "../assets/gameImages/placeholder.webp";
import Wonders7Image from "../assets/gameImages/placeholder.webp";
import AzulImage from "../assets/gameImages/placeholder.webp";
import RiskImage from "../assets/gameImages/placeholder.webp";

const boardGames = [
  {
    name: "Catan",
    type: "Area Control",
    objective: "Casual",
    likes: 1200,
    maxPlayers: 4,
    difficulty: "Medium",
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
    difficulty: "Medium",
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
    difficulty: "Medium",
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
    name: "Chess",
    type: "Abstract Strategy",
    objective: "Competitive",
    likes: 1800,
    maxPlayers: 4,
    difficulty: "Medium",
    image: ChessImage,
    duration: "Medium (30 - 60 mins)",
    complexity: "Heavy",
    description: "A classic two-player strategy game where players aim to checkmate the opponent's king.",
    rules: "Each piece moves uniquely. The goal is to checkmate the opponent's king by placing it in an inescapable position.",
    reviews: [
      {
        text: "The ultimate strategy game. After 20 years I'm still learning new tactics and openings. Timeless masterpiece.",
        author: "Grandmaster P.",
        rating: 5,
        date: "2023-06-15"
      },
      {
        text: "Intimidating for beginners but incredibly rewarding. The chess community is very welcoming to new players.",
        author: "Beginner Beth",
        rating: 4,
        date: "2023-05-22"
      }
    ]
  },
  {
    name: "Exploding Kittens",
    type: "Party",
    objective: "Casual",
    likes: 1100,
    maxPlayers: 4,
    difficulty: "Medium",
    image: ExplodingKittensImage,
    duration: "Short (<30 mins)",
    complexity: "Light",
    description: "A card game where players draw cards and try to avoid exploding kittens.",
    rules: "Players draw cards and use action cards to avoid drawing an Exploding Kitten. The last player remaining wins.",
    reviews: [
      {
        text: "Hilarious party game! The artwork is fantastic and games are quick and chaotic. Perfect for game nights.",
        author: "Party Pete",
        rating: 5,
        date: "2023-04-18"
      },
      {
        text: "Fun but very random. More about luck than strategy. Good for casual play with non-gamers.",
        author: "Strategy Steve",
        rating: 3,
        date: "2023-03-30"
      }
    ]
  },
  {
    name: "Clue",
    type: "Murder Mystery",
    objective: "Competitive",
    likes: 750,
    maxPlayers: 4,
    difficulty: "Medium",
    image: ClueImage,
    duration: "Medium (30 - 60 mins)",
    complexity: "Medium",
    description: "A classic detective board game where players must deduce who committed the murder, with what weapon, and in which room.",
    rules: "Players move around the board, collect clues, and make accusations to determine the murderer, weapon, and location.",
    reviews: [
      {
        text: "A childhood favorite that still holds up. The deduction element is timeless. Newer editions have better components.",
        author: "Nostalgic Nancy",
        rating: 4,
        date: "2023-02-14"
      },
      {
        text: "Too much luck involved with dice rolls. Modern deduction games like Chronicles of Crime have surpassed this.",
        author: "Modern Mike",
        rating: 2,
        date: "2023-01-25"
      }
    ]
  },
  {
    name: "Pandemic",
    type: "Cooperative",
    objective: "Casual",
    likes: 1300,
    maxPlayers: 4,
    difficulty: "Medium",
    image: PandemicImage,
    duration: "Long (1-2 hours)",
    complexity: "Medium",
    description: "A cooperative board game where players work together to stop global disease outbreaks.",
    rules: "Players move around the board, treating infections, collecting cards, and strategizing to prevent the spread of diseases before time runs out.",
    reviews: [
      {
        text: "The game that made me love cooperative games. Tense until the very end and requires real teamwork to win.",
        author: "Dr. Cooper",
        rating: 5,
        date: "2023-07-11"
      },
      {
        text: "Can suffer from quarterbacking where one player dominates decisions. Still a great design though.",
        author: "Team Player Tim",
        rating: 4,
        date: "2023-06-03"
      }
    ]
  },
  {
    name: "Monopoly",
    type: "Area Control",
    objective: "Competitive",
    likes: 600,
    maxPlayers: 4,
    difficulty: "Medium",
    image: MonopolyImage,
    duration: "Extended (2 hours+)",
    complexity: "Medium",
    description: "A classic real estate game where players buy, trade, and develop properties to bankrupt their opponents.",
    rules: "Players roll dice to move, buy properties, collect rent, and avoid bankruptcy. The last player standing wins.",
    reviews: [
      {
        text: "Nostalgic but flawed. Games drag on too long and the early leader usually wins. House rules help but the design needs updating.",
        author: "Reformed Player",
        rating: 2,
        date: "2023-05-17"
      },
      {
        text: "Love the new speed die version! Cuts playtime in half. Still the classic my family enjoys during holidays.",
        author: "Traditional Tom",
        rating: 3,
        date: "2023-04-28"
      }
    ]
  },
  {
    name: "Dominion",
    type: "Strategy",
    objective: "Competitive",
    likes: 700,
    maxPlayers: 4,
    difficulty: "Medium",
    image: DominionImage,
    duration: "Medium (30 - 60 mins)",
    complexity: "Medium",
    description: "A deck-building card game where players collect, upgrade, and strategize to create the most efficient deck.",
    rules: "Players buy cards from a shared market, play action cards, and aim to accumulate the most victory points.",
    reviews: [
      {
        text: "The game that started the deck-building genre. Endless replayability with expansions. Pure strategic goodness.",
        author: "Card Shark",
        rating: 5,
        date: "2023-08-19"
      },
      {
        text: "Can feel solitary as players focus on their own decks. Some kingdom card combinations break the game.",
        author: "Social Sally",
        rating: 3,
        date: "2023-07-22"
      }
    ]
  },
  {
    name: "7 Wonders",
    type: "Strategy",
    objective: "Casual",
    likes: 950,
    maxPlayers: 4,
    difficulty: "Medium",
    image: Wonders7Image,
    duration: "Medium (30 - 60 mins)",
    complexity: "Medium",
    description: "A civilization-building card game where players draft cards to develop their city and military strength.",
    rules: "Players draft cards in multiple rounds, building resources and military to score the most points.",
    reviews: [
      {
        text: "Perfect balance of strategy and speed. Plays up to 7 in under an hour! The dual-layer player boards are a nice upgrade.",
        author: "Efficient Eric",
        rating: 5,
        date: "2023-09-30"
      },
      {
        text: "Steep learning curve for new players with all the symbols. Once you get it though, it's fantastic.",
        author: "Persistent Pat",
        rating: 4,
        date: "2023-08-15"
      }
    ]
  },
  {
    name: "Azul",
    type: "Abstract Strategy",
    objective: "Casual",
    likes: 880,
    maxPlayers: 4,
    difficulty: "Medium",
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
  {
    name: "Risk",
    type: "Area Control",
    objective: "Competitive",
    likes: 650,
    maxPlayers: 4,
    difficulty: "Medium",
    image: RiskImage,
    duration: "Extended (>2 hours)",
    complexity: "Heavy",
    description: "A classic war strategy game where players battle for world domination through strategic attacks and alliances.",
    rules: "Players take turns attacking and defending territories using dice rolls and troop reinforcements. The player who controls the most territories wins.",
    reviews: [
      {
        text: "The Legacy version transformed this classic. The evolving board and persistent changes create an unforgettable campaign experience.",
        author: "Legacy Lover",
        rating: 5,
        date: "2023-11-08"
      },
      {
        text: "Too dependent on dice luck. Games can last forever if players are too cautious. There are better area control games now.",
        author: "Modern Warmonger",
        rating: 2,
        date: "2023-10-01"
      }
    ]
  }
];

export default boardGames;