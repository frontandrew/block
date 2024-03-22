import { Layout } from "./components";

import { Avatar } from "../../assets/images";
const data = [
    {
        id: 5,
        name: 'John Doe',
        date: 'Su',
        message: 'Чекаво? Вася!',
        count: '9+',
    },
    {
        id: 7,
        name: 'Samanta Smith',
        date: '10:59',
        message: 'Алло, на!',
        count: '7',
    },
    {
        id: 150,
        avatar: { pic: Avatar },
        name: 'Zombak',
        date: 'Tu',
        message: 'Ha-Ha-ha!!',
        count: '1',
    },
    {
        id: 256,
        name: 'Imperor',
        date: '21:03',
        message: 'Алло, на!',
        count: '4',
    },
    {
        id: 150,
        avatar: { pic: Avatar },
    },
    {
        id: 255,
        avatar: { pic: Avatar },
        name: 'Kornelius Vander Disappointovichev',
    },
    {
        id: 256,
        avatar: { pic: Avatar },
        name: 'Kornelius Vander Disappointovichev',
        date: '22 Feb 2022',
        message: 'Lorem, quas ab similique quia pere culpa kufnsk su veniam accusantium.',
        count: '4',
    },
    {
        id: 257,
        avatar: { pic: Avatar },
        name: 'Kornelius Vander Disappointovichev',
        message: 'Lorem, quas ab similique quia pere culpa kufnsk su veniam accusantium.',
    },
    {
        id: 14313,
        avatar: { pic: Avatar },
        name: 'Тимур',
    },
    {
        id: 13,
        name: 'Imperor',
        date: '8 March',
        message: 'Алло, на!',
    },
]

export class PageChats extends Layout {
    constructor(props) {
        super({ data, ...props })
    }
};