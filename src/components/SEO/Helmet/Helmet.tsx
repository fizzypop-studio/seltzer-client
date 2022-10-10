import { ReactNode } from 'react';
import { Helmet as Head } from 'react-helmet-async';

const DOMAIN = 'https://mywebsite.com';
const MAIN_KEYWORDS = 'my website, tech, software, content';

const DEFAULT_IMAGE_CARD = 'https://mywebsite.com/image-card';
const DEFAULT_TITLE = 'Seltzer';
const DEFAULT_DESCRIPTION = 'A React Starter application';

// TODO: Add Favicon source from URL - uncomment below and in return render
// const FAVICON_SOURCE = 'https://mywebsite.com/favicon.ico';

const POSTFIX_TITLE = ' | Seltzer';

type HelmetProps = {
	title?: string;
	description?: string;
	link: string;
	keywords?: string;
	imageCard?: string;
	largeTwitterCard?: boolean;
	addPostfixTitle?: boolean;
	noIndex?: boolean;
	children?: ReactNode;
};

export const Helmet = ({
	title = DEFAULT_TITLE,
	description = DEFAULT_DESCRIPTION,
	link,
	keywords = '',
	imageCard = DEFAULT_IMAGE_CARD,
	largeTwitterCard = false,
	addPostfixTitle = false,
	noIndex = false,
	children = null,
}: HelmetProps) => {
	let metaTitle: string;

	if (addPostfixTitle) {
		metaTitle = title + POSTFIX_TITLE;
	} else {
		metaTitle = title;
	}

	const metaDesc = description ?? DEFAULT_DESCRIPTION;
	const metaLink = DOMAIN + link;

	const metaKeywords = keywords.length
		? MAIN_KEYWORDS + ', ' + keywords
		: MAIN_KEYWORDS;

	let metaImageCard: string;

	if (imageCard) {
		if (imageCard.startsWith('https')) {
			metaImageCard = imageCard;
		} else {
			metaImageCard = DOMAIN + imageCard;
		}
	} else {
		metaImageCard = DEFAULT_IMAGE_CARD;
	}

	const metaRobots = noIndex ? 'noindex, nofollow' : 'index, follow';

	const twitterCardType = largeTwitterCard
		? 'summary_large_image'
		: 'summary';

	return (
		<Head>
			<html lang="en" />
			<title>{metaTitle}</title>
			<meta name="description" content={metaDesc} />
			<link rel="canonical" href={metaLink} />
			<meta name="keywords" content={metaKeywords} />
			<meta name="robots" content={metaRobots} />
			{/* <link rel="icon" href={FAVICON_SOURCE} /> */}

			{/* OG Tags */}
			{/* https://ogp.me/ */}
			<meta property="og:url" title={metaLink} />
			<meta property="og:title" title={metaTitle} />
			<meta property="og:description" title={metaDesc} />
			<meta property="og:type" content="..." />
			<meta property="og:image" content={metaImageCard} />

			{/* Twitter tags */}
			{/* https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started */}
			<meta property="twitter:site" title="twitter username of website" />
			<meta property="twitter:title" title={metaTitle} />
			<meta property="twitter:description" title={metaDesc} />
			<meta
				property="twitter:creator"
				content="twitter username of webpage content"
			/>
			<meta property="twitter:card" content={twitterCardType} />
			<meta property="twitter:image" content={metaImageCard} />

			{/* https://moz.com/blog/meta-referrer-tag */}
			<meta name="referrer" content="origin-when-crossorigin" />

			{children}
		</Head>
	);
};
