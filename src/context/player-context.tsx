
'use client';

import { PlayerNameModal } from '@/components/page/player-name-modal';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Champion = {
  name: string;
  date: string;
};

type PlayerContextType = {
  playerName: string | null;
  setPlayerName: (name: string) => void;
  champions: Champion[];
  addChampion: () => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [playerName, setPlayerNameState] = useState<string | null>(null);
  const [champions, setChampions] = useState<Champion[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedName = localStorage.getItem('playerName');
      if (storedName) {
        setPlayerNameState(storedName);
      }
      const storedChampions = localStorage.getItem('champions');
      if (storedChampions) {
        setChampions(JSON.parse(storedChampions));
      }
    } catch (error) {
      console.error("Could not access localStorage. Player state will not be persisted.", error);
    }
    setIsInitialized(true);
  }, []);

  const setPlayerName = (name: string) => {
    try {
      localStorage.setItem('playerName', name);
    } catch (error) {
       console.error("Could not access localStorage. Player name not saved.", error);
    }
    setPlayerNameState(name);
  };

  const addChampion = () => {
    if (!playerName) return;

    const newChampion: Champion = {
      name: playerName,
      date: new Date().toLocaleDateString(),
    };

    setChampions(prevChampions => {
      const updatedChampions = [...prevChampions, newChampion];
       try {
        localStorage.setItem('champions', JSON.stringify(updatedChampions));
      } catch (error) {
        console.error("Could not access localStorage. Champions list not saved.", error);
      }
      return updatedChampions;
    });
  };

  const value = { playerName, setPlayerName, champions, addChampion };

  if (!isInitialized) {
    return null; // or a loading spinner
  }

  return (
    <PlayerContext.Provider value={value}>
      {!playerName && <PlayerNameModal />}
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
