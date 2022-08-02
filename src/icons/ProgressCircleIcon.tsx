export const ProgressCircleIcon = (props: { class: string }) => (
  <svg
    height="100%"
    viewBox="0 0 20 20"
    width="100%"
    style="overflow: visible;"
    class={props.class}
  >
    <circle
      cx="50%"
      cy="50%"
      fill="none"
      stroke-width="2"
      r="9"
      stroke="#38444D"
    ></circle>
    <circle
      cx="50%"
      cy="50%"
      fill="none"
      stroke-width="2"
      r="9"
      stroke="#1D9BF0"
      stroke-linecap="round"
      style="stroke-dashoffset: 56.3467; stroke-dasharray: 56.5487;"
    ></circle>
  </svg>
)
