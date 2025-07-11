import { useContext } from 'react';
import { GuessContext } from '../context/Context';
import { SOCKET_MESSAGE_TYPE } from '../context/Constants';

interface ChipProps {
  label: string;
  color: string;
}

const Chip = ({ label, color }: ChipProps) => {
  return (
    <div className="chip">
      <div className="dot" style={{ backgroundColor: color }}></div>
      <span>{label}</span>
    </div>
  );
};

const Namechips = () => {
  const { gameplayData, userName } = useContext(GuessContext);
  const joinees = gameplayData.filter(
    (e: any) => e.type === SOCKET_MESSAGE_TYPE.JOINED
  );
  console.log(gameplayData);

  return (
    <div className="chip-wrap">
      {joinees.map((e: any, i: number) => (
        <Chip
          key={i}
          label={`${e.name}${e.name === userName ? '(You)' : ''}`}
          color={e.color}
        />
      ))}
    </div>
  );
};

export default Namechips;
