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
    description: "Catan is a strategy board game where players collect and trade resources to build roads, settlements, and cities to earn victory points.",
    rules: "Players roll dice to collect resources, trade with others, and build structures to expand their settlements. The first player to reach 10 points wins."
  },
  {
    name: "Ticket to Ride",
    type: "Area Control",
    objective: "Casual",
    likes: 950,
    maxPlayers: 4,
    difficulty: "Medium",
    image: TicketToRideImage,
    description: "A railway-themed board game where players collect train cards to claim railway routes and complete destination tickets.",
    rules: "Players draw cards and claim routes on the board. Longer routes and completed tickets score higher points."
  },
  {
    name: "Gloomhaven",
    type: "Strategy",
    objective: "Competitive",
    likes: 800,
    maxPlayers: 4,
    difficulty: "Medium",
    image: GloomhavenImage,
    description: "A cooperative campaign-driven dungeon crawler with evolving storylines and character progression.",
    rules: "Players use cards to control actions, complete scenarios, and unlock new quests. Combat is turn-based and cooperative."
  },
  {
    name: "Chess",
    type: "Abstract Strategy",
    objective: "Competitive",
    likes: 1800,
    maxPlayers: 4,
    difficulty: "Medium",
    image: ChessImage,
    description: "A classic two-player strategy game where players aim to checkmate the opponent's king.",
    rules: "Each piece moves uniquely. The goal is to checkmate the opponent’s king by placing it in an inescapable position."
  },
  {
    name: "Exploding Kittens",
    type: "Party",
    objective: "Casual",
    likes: 1100,
    maxPlayers: 4,
    difficulty: "Medium",
    image: ExplodingKittensImage,
    description: "A card game where players draw cards and try to avoid exploding kittens.",
    rules: "Players draw cards and use action cards to avoid drawing an Exploding Kitten. The last player remaining wins."
  },
  {
    name: "Clue",
    type: "Murder Mystery",
    objective: "Competitive",
    likes: 750,
    maxPlayers: 4,
    difficulty: "Medium",
    image: ClueImage,
    description: "A classic detective board game where players must deduce who committed the murder, with what weapon, and in which room.",
    rules: "Players move around the board, collect clues, and make accusations to determine the murderer, weapon, and location."
  },
  {
    name: "Pandemic",
    type: "Cooperative",
    objective: "Casual",
    likes: 1300,
    maxPlayers: 4,
    difficulty: "Medium",
    image: PandemicImage,
    description: "A cooperative board game where players work together to stop global disease outbreaks.",
    rules: "Players move around the board, treating infections, collecting cards, and strategizing to prevent the spread of diseases before time runs out."
  },
  {
    name: "Monopoly",
    type: "Area Control",
    objective: "Competitive",
    likes: 600,
    maxPlayers: 4,
    difficulty: "Medium",
    image: MonopolyImage,
    description: "A classic real estate game where players buy, trade, and develop properties to bankrupt their opponents.",
    rules: "Players roll dice to move, buy properties, collect rent, and avoid bankruptcy. The last player standing wins."
  },
  {
    name: "Dominion",
    type: "Strategy",
    objective: "Competitive",
    likes: 700,
    maxPlayers: 4,
    difficulty: "Medium",
    image: DominionImage,
    description: "A deck-building card game where players collect, upgrade, and strategize to create the most efficient deck.",
    rules: "Players buy cards from a shared market, play action cards, and aim to accumulate the most victory points."
  },
  {
    name: "7 Wonders",
    type: "Strategy",
    objective: "Casual",
    likes: 950,
    maxPlayers: 4,
    difficulty: "Medium",
    image: Wonders7Image,
    description: "A civilization-building card game where players draft cards to develop their city and military strength.",
    rules: "Players draft cards in multiple rounds, building resources and military to score the most points."
  },
  {
    name: "Azul",
    type: "Abstract Strategy",
    objective: "Casual",
    likes: 880,
    maxPlayers: 4,
    difficulty: "Medium",
    image: AzulImage,
    description: "A tile-laying game where players draft colorful tiles to complete patterns and score points.",
    rules: "Players take turns selecting tiles and placing them on their boards, trying to maximize points through strategic placement."
  },
  {
    name: "Risk",
    type: "Area Control",
    objective: "Competitive",
    likes: 650,
    maxPlayers: 4,
    difficulty: "Medium",
    image: RiskImage,
    description: "A classic war strategy game where players battle for world domination through strategic attacks and alliances.",
    rules: "Players take turns attacking and defending territories using dice rolls and troop reinforcements. The player who controls the most territories wins."
  }
];

export default boardGames;
