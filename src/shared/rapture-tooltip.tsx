import { styled } from "@mui/material/styles";
import { Tooltip, tooltipClasses, TooltipProps } from "@mui/material";

const RaptureTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "#BBB",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#666',
    border: "2px solid #BBB",
  },
}));

export default RaptureTooltip;