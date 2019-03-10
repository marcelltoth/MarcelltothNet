import * as React from 'react';
import {Table as ReactTable} from 'reactstrap';


export const Table : React.FC = ({children}) => {
    return <ReactTable>
        {children}
    </ReactTable>;
};

export const TableHead : React.FC = ({children}) => {
    return <thead className="thead-light">
        {children}
    </thead>;
}

export const TableBody : React.FC = ({children}) => {
    return <tbody>
        {children}
    </tbody>;
}

export const TableRow : React.FC = ({children}) => {
    return <tr>
        {children}
    </tr>;
}

interface TableCellProps{
    isHeader?: boolean;
    align?: 'right';
}

export const TableCell : React.FC<TableCellProps> = ({children, isHeader}) => {
    if(isHeader){
        return <th>
            {children}
        </th>;
    }
    return <td>
        {children}
    </td>;
}