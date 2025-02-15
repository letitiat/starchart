import { RadioGroup as RadioGroupUI } from "radix-ui";
import "./RadioGroup.scss";

type RadioGroupProps = {
  radioGroupOptions: {
    label: string,
    value: string,
    default?: boolean,
  }[],
  handleRadioGroupChange: (option: string) => void
}

export const RadioGroup = ({
  radioGroupOptions,
  handleRadioGroupChange,
}: RadioGroupProps) => {

  const defaultOption = radioGroupOptions.find((option) => option.default) || radioGroupOptions[0];

  return (
    <form>
      <RadioGroupUI.Root
        className="RadioGroupRoot"
        defaultValue={defaultOption.value}
        aria-label="View density"
        onValueChange={(option) => handleRadioGroupChange(option)}
      >
        {
          radioGroupOptions.map((option, i) => (
            <div style={{ display: "flex", alignItems: "center" }}>
              <RadioGroupUI.Item className="RadioGroupItem" value={option.value} id={`r-${i}`}>
                <RadioGroupUI.Indicator className="RadioGroupIndicator" />
              </RadioGroupUI.Item>
              <label className="Label" htmlFor={`r-${i}`}>
                {option.label}
              </label>
            </div>
          ))
        }
      </RadioGroupUI.Root>
    </form>
  )
};
