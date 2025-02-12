import { DisabledIcon, FilledStarIcon, UnfilledStarIcon } from "../icons"
import { StarTypes } from "../types";

type StarProps = {
  state: StarTypes;
  handleOnClick: () => void
}

export const Star = ({state: initialState, handleOnClick}: StarProps) => {
  if (initialState === 'disabled') {
    return <DisabledIcon />
  }

   return(
    initialState === 'filled' ?
        <FilledStarIcon onClick={handleOnClick} /> :
        <UnfilledStarIcon onClick={handleOnClick} />
        )
};