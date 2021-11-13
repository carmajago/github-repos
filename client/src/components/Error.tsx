
interface Props {
    message?: string;
}
export const Error = ({ message = 'Error fetching data' }: Props) => {
    return (
        <div>
            <h1 className="text-center">{message}</h1>
        </div>
    )
}
