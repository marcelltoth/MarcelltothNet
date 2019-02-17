import * as React from 'react';
import { Input } from 'reactstrap';

interface FileSelectorProps{
    value: string | undefined;
    onChange: (newValue: string) => void;
    placeholderText?: string;
}

export class FileSelector extends React.Component<FileSelectorProps>{

    public static defaultProps: Partial<FileSelectorProps> = {
        placeholderText: "File"
    };

    private handleFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const file = ev.currentTarget.files && ev.currentTarget.files[0];
        if(file){
            const reader = new FileReader();
            reader.onload = (evt) => {
                this.props.onChange((evt as any).target.result);
            }
            reader.readAsDataURL(file);
        }
    }

    render(){
        const {placeholderText} = this.props;
        return <div>
            <Input type="file" placeholder={placeholderText} onChange={this.handleFileChange} />
        </div>
    }
}