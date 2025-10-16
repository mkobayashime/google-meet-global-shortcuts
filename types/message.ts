const reactionKinds = [
	"sparklingHeart",
	"thumbsUp",
	"tada",
	"clap",
	"joy",
	"openMouth",
	"cry",
	"thinkingFace",
	"thumbsDown",
] as const;
export type ReactionKind = (typeof reactionKinds)[number];

export type Message =
	| {
			type: "toggleAudio" | "toggleCamera" | "toggleHand";
	  }
	| {
			type: "reaction";
			kind: ReactionKind;
	  };
