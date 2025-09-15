import { Children } from "react"

function Button({
  children,
    assign, //assign is basically the button name
    buttonType='button',
    className="",
    ...otherProps
}) {
  return (
    <button className={`${className}`} type={buttonType} {...otherProps}>{assign}{children}</button>
  )
}

export default Button
