import { themeType } from "../Types";

const theme: themeType = {
	color: {
		primary: {
			default: { color: "#00d1b2", contrast: "#fff" },
			hover: { color: "#00c4a7", contrast: "#fff" },
			active: { color: "#00b89c", contrast: "#fff" },
		},
		danger: {
			default: { color: "#f14668", contrast: "#fff" },
			hover: { color: "#f03a5f", contrast: "#fff" },
			active: { color: "#ef2e55", contrast: "#fff" },
		},
		warning: {
			default: { color: "#ffe08a", contrast: "#000000b3" },
			hover: { color: "#ffdc7d", contrast: "#000000b3" },
			active: { color: "#ffd970", contrast: "#000000b3" },
		}
	}
}

export default theme;
