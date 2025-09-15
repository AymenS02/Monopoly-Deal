import GameBoard from '../components/Board'
// import PlayerHand from '../components/PlayerHand'
// import GameControls from '../components/GameControls'

const Game = () => {
    return (
        <div className='h-screen bg-green-100 text-green-800 p-4'>
            <h1 className="text-4xl font-bold">Monopoly Deal</h1>
            <p className="mt-4">Welcome to the Monopoly Deal game!</p>

            {/* Add more components and game logic here */}
            <GameBoard />
            {/* <PlayerHand />
            <GameControls /> */}
        </div>
    )
}

export default Game