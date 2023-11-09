
export default function SectionTitle({
    title,
    paragraph,
    width = "570px",
    center,
    mb = "100px",
}: {
    title: string;
    paragraph?: string;
    width?: string;
    center?: boolean;
    mb?: string;
}) {
    return (
        <>
            <div
                className={`wow fadeInUp w-full ${center ? "mx-auto text-center" : ""}`}
                data-wow-delay=".1s"
                style={{ maxWidth: width, marginBottom: mb }}
            >
                <h2 className="mb-4 text-3xl font-bold !leading-tight text-diamond-black dark:text-diamond-white diamondSm:text-4xl diamondMd:text-[45px]">
                    {title}
                </h2>
                <p className="text-base !leading-relaxed text-diamond-body-color diamondMd:text-lg">
                    {paragraph}
                </p>
            </div>
        </>)
}
