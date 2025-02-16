import { DisabledIcon, FilledStarIcon, UnfilledStarIcon } from "../../icons"
import { DayState } from "../../types/types";
import styles from './Star.module.scss';

type StarProps = {
  state: DayState;
  handleOnClick: () => void
}

export const Star = ({state: initialState, handleOnClick}: StarProps) => {
  if (initialState === 'disabled') {
    return <DisabledIcon className={styles.svg} />
  }

   return(
    initialState === 'selected' ?
        <FilledStarIcon onClick={handleOnClick} className={styles.svg}/> :
        <UnfilledStarIcon onClick={handleOnClick} className={styles.svg} />
        )
};