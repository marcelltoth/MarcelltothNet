import { CodeBlock } from './code-block';
import { Blockquote } from './blockquote';
import { List, ListItem } from './list';
import { Paragraph } from './paragraph';
import { Table, TableHead, TableBody, TableRow, TableCell } from './table';
import { Heading } from './heading';
import { Link } from './link';
import { Image } from './image';

export const elementMap = {
    code: CodeBlock,
    blockquote: Blockquote,
    heading: Heading,
    image: Image,
    link: Link,
    list: List,
    listItem: ListItem,
    paragraph: Paragraph,
    table: Table,
    tableHead: TableHead,
    tableBody: TableBody,
    tableRow: TableRow,
    tableCell: TableCell
};