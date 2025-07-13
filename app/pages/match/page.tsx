'use client';

import React, { useCallback, useState } from 'react';
import styles from './page.module.scss';
import { NUMBERS, ROW1, ROW2, ROW3, VOWELS } from '@const/index';
import CustomButton from '@comp/CustomButton';

const Set = () => {
  const MOVIE_NAME = 'ONCE UPON A TIME IN HOLLYWOOD';
  const [usedCorrectLetters, setUsedCorrectLetters] = useState<string[]>([]);
  const [usedIncorrectLetters, setUsedIncorrectLetters] = useState<string[]>(
    []
  );

  const parseMovieName = useCallback(
    (movieName: string): React.ReactElement[] => {
      return movieName.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className={styles.slotText}>
          {word.split('').map((char, charIndex) => {
            const upperChar = char.toUpperCase();
            if (VOWELS.includes(upperChar)) {
              return <span key={charIndex}>{char}</span>;
            }
            if (usedCorrectLetters.includes(upperChar)) {
              return <span key={charIndex}>{char}</span>;
            }
            return <span key={charIndex}>_</span>;
          })}
        </span>
      ));
    },
    [usedCorrectLetters]
  );

  const renderGameSlot = useCallback(() => {
    const parsedMovieName = parseMovieName(MOVIE_NAME);
    return <div className={styles.gameSlot}>{parsedMovieName}</div>;
  }, [parseMovieName]);

  const renderIncorrectLetters = useCallback(() => {
    return (
      <div className={styles.incorrectLetters}>
        {usedIncorrectLetters.length > 0 ? (
          usedIncorrectLetters.map((letter, index) => (
            <CustomButton
              text={letter}
              key={index}
              className={styles.incorrectButton}
            />
          ))
        ) : (
          <span className={styles.noIncorrectLetters}>
            Nothing here yet! good job
          </span>
        )}
      </div>
    );
  }, [usedIncorrectLetters]);

  const renderButtonRow = useCallback(
    (letters: string[], key: number) => (
      <div className={styles.buttonRow} key={key}>
        {letters.map((letter, index) => {
          const disabled =
            usedCorrectLetters.includes(letter.toUpperCase()) ||
            usedIncorrectLetters.includes(letter.toUpperCase()) ||
            VOWELS.includes(letter.toUpperCase());
          return (
            <CustomButton
              key={index}
              text={letter}
              className={disabled ? styles.disabledButton : undefined}
              onClick={
                disabled
                  ? () => {}
                  : () => {
                      const upperLetter = letter.toUpperCase();
                      if (MOVIE_NAME.includes(upperLetter)) {
                        setUsedCorrectLetters((prev) =>
                          prev.includes(upperLetter)
                            ? prev
                            : [...prev, upperLetter]
                        );
                      } else {
                        setUsedIncorrectLetters((prev) =>
                          prev.includes(upperLetter)
                            ? prev
                            : [...prev, upperLetter]
                        );
                      }
                    }
              }
            />
          );
        })}
      </div>
    ),
    [usedCorrectLetters, usedIncorrectLetters]
  );

  return (
    <div className={styles.container}>
      <div className={styles.match}>
        <div className={styles.topSection}>
          {renderGameSlot()}
          <div className={styles.usedLetters}>
            <div className={styles.letters}>{renderIncorrectLetters()}</div>
            <div className={styles.guesses}>Guess(es) left: 9</div>
          </div>
        </div>
        <div className={styles.keyboard}>
          {[NUMBERS, ROW1, ROW2, ROW3].map((element, index) =>
            renderButtonRow(element, index)
          )}
        </div>
      </div>
    </div>
  );
};
export default Set;
