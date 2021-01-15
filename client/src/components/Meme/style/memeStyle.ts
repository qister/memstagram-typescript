import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 445,
        border: 0,
        borderRadius: 3,
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
        padding: "0 30px",
    },
    media: {
        height: 400,
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    avatar: {
        backgroundColor: red[500],
    },
    cardActions: {
        justifyContent: "space-between",
    },
    fabButton: {
        position: "absolute",
        zIndex: 1,
        bottom: -30,
        left: 0,
        right: 0,
        margin: "0 auto",
    },
}));
  
export const useStylesLoader = makeStyles((theme: Theme) =>
    createStyles({
        root: {
        display: "flex",
        "& > * + *": {
            marginLeft: theme.spacing(2),
        },
        },
    })
);