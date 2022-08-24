export default function GamesCard({ game }) {
  return (
    <div className="max-w-xs overflow-hidden text-center rounded shadow-lg">
      <img class="w-full" src={game.img} alt={game.name}></img>
      <div class="font-bold text-xl mb-2">{game.name}</div>
    </div>
  )
}