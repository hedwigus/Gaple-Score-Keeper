import React, { useState, useMemo, useCallback, FC } from 'react';
import { Player } from './types';
import { PlusIcon, TrashIcon, LocationIcon, CrownIcon, RefreshIcon, SpinnerIcon } from './components/icons';

const PREDEFINED_NAMES = [
  "Joko", "Budi", "Edy", "Edi", "Teguh", "Rahmat", "Bambang", "Agus", 
  "Anto", "Usman", "Jefri", "Tri", "Fikar", "Yudi", "Merdha", "Marjuki", 
  "Imam", "Alex", "Priyo", "Aldo", "Joni", "Guntur", "Denny", "Dani", 
  "Rian", "Rizky", "Mike", "Dodi"
].sort();

const GameInfo: FC<{
  date: string;
  location: string;
  isFetchingLocation: boolean;
  onLocationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFetchLocation: () => void;
}> = ({ date, location, isFetchingLocation, onLocationChange, onFetchLocation }) => (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md space-y-4">
        <div className="flex justify-between items-center text-sm text-gray-400">
            <span>Date</span>
            <span>{date}</span>
        </div>
        <div className="relative">
            <input
                type="text"
                value={location}
                onChange={onLocationChange}
                placeholder="Game Location"
                className="w-full bg-gray-700 border border-gray-600 rounded-md py-2 pl-3 pr-10 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            />
            <button
                onClick={onFetchLocation}
                disabled={isFetchingLocation}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-cyan-400 disabled:text-gray-500 disabled:cursor-not-allowed transition"
                aria-label="Fetch Location"
            >
                {isFetchingLocation ? <SpinnerIcon /> : <LocationIcon />}
            </button>
        </div>
    </div>
);

const PlayerManager: FC<{
    players: Player[];
    onAddPlayer: (name: string) => void;
    onRemovePlayer: (id: string) => void;
}> = ({ players, onAddPlayer, onRemovePlayer }) => {
    const [newPlayerName, setNewPlayerName] = useState('');
    const isPlayerLimitReached = players.length >= 4;

    const handleAddClick = () => {
        if (newPlayerName.trim()) {
            onAddPlayer(newPlayerName.trim());
            setNewPlayerName('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddClick();
        }
    };
    
    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md space-y-4">
            <h2 className="text-lg font-semibold text-gray-200">Players</h2>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={isPlayerLimitReached ? "Max 4 players reached" : "Enter or select player name"}
                    className="flex-grow bg-gray-700 border border-gray-600 rounded-md py-2 px-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition disabled:bg-gray-600 disabled:cursor-not-allowed"
                    list="predefined-names"
                    disabled={isPlayerLimitReached}
                />
                <datalist id="predefined-names">
                    {PREDEFINED_NAMES.map(name => <option key={name} value={name} />)}
                </datalist>
                <button
                    onClick={handleAddClick}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold p-2 rounded-md flex items-center justify-center transition disabled:bg-gray-500"
                    disabled={!newPlayerName.trim() || isPlayerLimitReached}
                    aria-label="Add Player"
                >
                    <PlusIcon />
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {players.map(player => (
                    <div key={player.id} className="bg-gray-700 rounded-full px-3 py-1 flex items-center gap-2 text-sm">
                        <span>{player.name}</span>
                        <button onClick={() => onRemovePlayer(player.id)} className="text-gray-400 hover:text-red-400 transition">
                            <TrashIcon className="h-4 w-4" />
                        </button>
                    </div>
                ))}
                 {players.length === 0 && <p className="text-sm text-gray-500 w-full text-center py-2">Add some players to start!</p>}
            </div>
        </div>
    );
};

const Scorecard: FC<{
    players: Player[];
    scores: number[][];
    totals: number[];
    winningPlayerIds: Set<string>;
    onScoreChange: (roundIndex: number, playerIndex: number, score: number) => void;
}> = ({ players, scores, totals, winningPlayerIds, onScoreChange }) => {
    if (players.length === 0) {
        return null;
    }
    
    return (
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-center">
                    <thead className="bg-gray-700/50">
                        <tr>
                            <th className="p-3 font-semibold text-sm text-gray-300 sticky left-0 bg-gray-700/50 z-10">Round</th>
                            {players.map(player => (
                                <th key={player.id} className={`p-3 font-semibold text-sm truncate max-w-[100px] ${winningPlayerIds.has(player.id) ? 'text-yellow-400' : 'text-gray-300'}`}>
                                    {winningPlayerIds.has(player.id) && <CrownIcon className="h-4 w-4 mr-1" />}
                                    {player.name}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map((roundScores, roundIndex) => {
                            const isPreviousRound = roundIndex < scores.length - 1;
                            const shouldHighlight = roundScores.length > 1;
                            const minRoundScore = shouldHighlight ? Math.min(...roundScores) : Infinity;
                            const maxRoundScore = shouldHighlight ? Math.max(...roundScores) : -Infinity;

                            return (
                                <tr key={roundIndex} className="border-b border-gray-700 last:border-b-0">
                                    <td className="p-2 font-bold text-gray-400 sticky left-0 bg-gray-800 z-10">{roundIndex + 1}</td>
                                    {roundScores.map((score, playerIndex) => {
                                        const isRoundMin = shouldHighlight && score === minRoundScore;
                                        const isRoundMax = shouldHighlight && score === maxRoundScore && minRoundScore !== maxRoundScore;
                                        
                                        let scoreClasses = 'w-full text-center rounded-md p-2 transition disabled:cursor-not-allowed';

                                        if (isPreviousRound) {
                                            if (isRoundMax) {
                                                scoreClasses += ' bg-red-600 text-white font-bold';
                                            } else if (isRoundMin) {
                                                scoreClasses += ' text-yellow-400 font-bold bg-gray-800';
                                            } else {
                                                scoreClasses += ' text-gray-400 bg-gray-800';
                                            }
                                        } else { // Current round
                                            scoreClasses += ' focus:ring-2 focus:ring-cyan-500 border border-transparent focus:border-cyan-500';
                                            if (isRoundMin) {
                                                scoreClasses += ' bg-cyan-900/50 text-cyan-300 font-medium';
                                            } else if (isRoundMax) {
                                                scoreClasses += ' bg-red-900/50 text-red-300';
                                            } else {
                                                scoreClasses += ' bg-gray-900';
                                            }
                                        }

                                        return (
                                            <td key={players[playerIndex].id} className="p-1">
                                                <input
                                                    type="number"
                                                    value={score}
                                                    onChange={(e) => onScoreChange(roundIndex, playerIndex, parseInt(e.target.value) || 0)}
                                                    className={scoreClasses}
                                                    disabled={isPreviousRound}
                                                />
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot className="bg-gray-700/50 font-bold">
                        <tr>
                            <td className="p-3 text-gray-300 sticky left-0 bg-gray-700/50 z-10">Total</td>
                            {totals.map((total, index) => (
                                <td key={players[index].id} className={`p-3 text-lg ${winningPlayerIds.has(players[index].id) ? 'text-yellow-300' : 'text-white'}`}>{total}</td>
                            ))}
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};


export default function App() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [scores, setScores] = useState<number[][]>([[]]);
    const [location, setLocation] = useState('');
    const [isFetchingLocation, setIsFetchingLocation] = useState(false);
    
    const date = useMemo(() => new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    }), []);

    const handleAddPlayer = useCallback((name: string) => {
        if (players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
            alert('Player name already exists.');
            return;
        }
        if (players.length >= 4) {
            alert('Maximum of 4 players reached.');
            return;
        }
        const newPlayer: Player = { id: crypto.randomUUID(), name };
        setPlayers(prev => [...prev, newPlayer]);
        setScores(prev => prev.map(round => [...round, 0]));
    }, [players]);

    const handleRemovePlayer = useCallback((id: string) => {
        const indexToRemove = players.findIndex(p => p.id === id);
        if (indexToRemove > -1) {
            setPlayers(prev => prev.filter(p => p.id !== id));
            setScores(prev => prev.map(round => round.filter((_, i) => i !== indexToRemove)));
        }
    }, [players]);

    const handleAddRound = useCallback(() => {
        setScores(prev => [...prev, Array(players.length).fill(0)]);
    }, [players.length]);

    const handleScoreChange = useCallback((roundIndex: number, playerIndex: number, score: number) => {
        setScores(prev => {
            const newScores = [...prev.map(round => [...round])];
            newScores[roundIndex][playerIndex] = score;
            return newScores;
        });
    }, []);

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    };

    const handleFetchLocation = useCallback(() => {
        setIsFetchingLocation(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // In a real app, you'd use a geocoding service.
                // For this demo, we'll just indicate success.
                setLocation(`Location fetched: ${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`);
                setIsFetchingLocation(false);
            },
            (error) => {
                alert(`Error fetching location: ${error.message}`);
                setIsFetchingLocation(false);
            },
            { timeout: 10000 }
        );
    }, []);

    const handleNewGame = useCallback(() => {
        if (window.confirm('Are you sure you want to start a new game? All current data will be lost.')) {
            setPlayers([]);
            setScores([[]]);
            setLocation('');
        }
    }, []);

    const totals = useMemo(() => {
        if (players.length === 0) return [];
        return players.map((_, playerIndex) => 
            scores.reduce((sum, round) => sum + (round[playerIndex] || 0), 0)
        );
    }, [scores, players]);

    const winningPlayerIds = useMemo(() => {
        if (totals.length === 0 || players.length === 0) return new Set<string>();
        const minScore = Math.min(...totals);
        const winners = new Set<string>();
        totals.forEach((total, index) => {
            if (total === minScore) {
                winners.add(players[index].id);
            }
        });
        return winners;
    }, [totals, players]);


    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
            <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-20 shadow-md">
                <div className="max-w-4xl mx-auto p-4">
                    <h1 className="text-2xl font-bold text-center text-cyan-400 tracking-wider">Domino Scorekeeper</h1>
                </div>
            </header>

            <main className="flex-grow p-4 pb-28">
                <div className="max-w-4xl mx-auto space-y-6">
                    <GameInfo 
                        date={date}
                        location={location}
                        isFetchingLocation={isFetchingLocation}
                        onLocationChange={handleLocationChange}
                        onFetchLocation={handleFetchLocation}
                    />
                    <PlayerManager 
                        players={players} 
                        onAddPlayer={handleAddPlayer} 
                        onRemovePlayer={handleRemovePlayer} 
                    />
                    <Scorecard 
                        players={players} 
                        scores={scores} 
                        totals={totals}
                        winningPlayerIds={winningPlayerIds}
                        onScoreChange={handleScoreChange} 
                    />
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 bg-gray-800/80 backdrop-blur-sm border-t border-gray-700 z-20">
                <div className="max-w-4xl mx-auto p-3 flex justify-center items-center gap-4">
                    <button
                        onClick={handleAddRound}
                        disabled={players.length === 0}
                        className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        <PlusIcon className="h-5 w-5"/>
                        <span>Add Round</span>
                    </button>
                    <button
                        onClick={handleNewGame}
                        className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition"
                    >
                        <RefreshIcon className="h-5 w-5"/>
                        <span>New Game</span>
                    </button>
                </div>
            </footer>
        </div>
    );
}
