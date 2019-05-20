import * as React from 'react';
import { Input } from 'reactstrap';

interface FileSelectorProps{
    value: string | undefined;
    onChange: (newValue: string, mimeType?: string) => void;
    placeholderText?: string;
    requestedFormat?: 'data-url' | 'base64';
}

export class FileSelector extends React.Component<FileSelectorProps>{

    public static defaultProps: Partial<FileSelectorProps> = {
        placeholderText: "File",
        requestedFormat: 'data-url'
    };

    private handleFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const file = ev.currentTarget.files && ev.currentTarget.files[0];
        if(file){
            const reader = new FileReader();
            reader.onload = (evt) => {
                const resultDataUrl = (evt as any).target.result;
                if(this.props.requestedFormat === 'data-url'){
                    this.props.onChange(resultDataUrl);
                }
                else{
                    // base64 encoded data doesn't contain commas    
                    const base64ContentArray = resultDataUrl.split(",")     
                    
                    // base64 content cannot contain whitespaces but nevertheless skip if there are!
                    const mimeType = base64ContentArray[0].match(/[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/)[0]

                    // base64 encoded data - pure
                    const base64Data = base64ContentArray[1];

                    this.props.onChange(base64Data, mimeType);
                }
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