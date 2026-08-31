interface BackgroundImageProps {
    imageURL: string;
    children: any;
}

/**
 * Background image, takes up width/height of the screen
 * @param imageURL url for image
 * @param children
 * @returns BackgroundImage component
 */
export default function BackgroundImage({
    imageURL,
    children,
}: BackgroundImageProps) {
    return (
        <div className="relative min-h-screen w-full py-4 sm:py-0 flex flex-col justify-center"> {/*bg-[#112e28] */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-50 overflow-hidden -z-10"
                style={{ backgroundImage: `url(${imageURL})` }}
            ></div>
            <div className="inset-x-0 item-center my-auto flex items-center justify-center">
                {children}
            </div>
        </div>
    );
}
