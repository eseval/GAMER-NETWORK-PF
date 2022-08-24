export default function GamesCard({ game }) {
  return (
    <div className="flex flex-col justify-between w-64 h-64 m-2 overflow-hidden text-center align-middle bg-gray-800 border border-gray-700 rounded-md shadow-lg">
      <img className="object-cover w-full h-32 rounded-t-lg" src={game.img} alt={game.name}/>
      <p className="mb-2 text-lg font-semibold text-white">{game.name}</p>
      <button className="px-2 py-1 mx-auto mb-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-800" >Add Favorite</button>
    </div>
  )
}