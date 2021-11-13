import {Image } from 'react-bootstrap';

interface Props {
    avatarUrl: string;
    username: string;
}

export const Profile = ({ avatarUrl, username }: Props) => {
    return (
        <>
            <Image src={avatarUrl} fluid roundedCircle></Image>
            <h5>{username}</h5>
        </>
    )
}
