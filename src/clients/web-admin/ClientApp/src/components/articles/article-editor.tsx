import * as React from 'react';
import { ArticleData } from '../../store/common/article';
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FileSelector } from '../common/file-selector';
import Select from 'react-select';
import { TagData } from '../../store/common/tag';
import { Option } from 'react-select/lib/filters';

interface ArticleEditorProps{
    availableTags: ReadonlyArray<TagData>;
    article: ArticleData;
    onChangeTitle: (newTitle: string) => void;
    onChangePublishDate: (newDate: Date) => void;
    onChangeThumbnail: (newUri: string, newAltText: string) => void;
    onChangeContent: (newContent: string) => void;
    onChangeTags: (newTagIds: number[]) => void;
}

export class ArticleEditor extends React.Component<ArticleEditorProps>{

    private handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChangeTitle(event.currentTarget.value);
    }

    private handleChangePublishDate = (newDate: Date) => {
        this.props.onChangePublishDate(newDate);
    }

    private handleChangeThumbnailAltText = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChangeThumbnail(this.props.article.thumbnailLocation, event.currentTarget.value);
    }
    
    private handleChangeThumbnailLocation = (newValue: string) => {
        this.props.onChangeThumbnail(newValue, this.props.article.thumbnailAltText);
    }

    private handleChangeContent = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChangeContent(event.currentTarget.value);
    }

    private handleChangeTags = (newOptions: Option[] | undefined | null) => {
        if(newOptions){
            this.props.onChangeTags(newOptions.map(o => Number(o.value)));
        } else {
            this.props.onChangeTags([]);
        }
        
    }
    

    render(){
        const {availableTags, article: {title, publishDate, content, thumbnailLocation, thumbnailAltText, tagIds}} = this.props;
        const options = availableTags.map(t => ({ value: t.id, label: t.displayName }));
        const selectedOptions = options.filter(o => tagIds.includes(o.value));
        return <Form>
            <FormGroup>
                <Label>Title:</Label>
                <Input type="text" placeholder="Article title" value={title} onChange={this.handleChangeTitle} />
            </FormGroup>
            <FormGroup>
                <Label>Publish Date / Time:</Label>
                <div>
                    <DatePicker
                        className="form-control"
                        selected={new Date(publishDate)}
                        onChange={this.handleChangePublishDate} />
                </div>
            </FormGroup>
            <Row>
                <Col width={6}>
                    <FormGroup>
                        <Label>Thumbnail image:</Label>
                        <FileSelector placeholderText="Image" value={thumbnailLocation} onChange={this.handleChangeThumbnailLocation} />
                    </FormGroup>
                </Col>
                <Col width={6}>
                    <FormGroup>
                        <Label>Thumbnail alt text:</Label>
                        <Input type="text" placeholder="Alt text" value={thumbnailAltText} onChange={this.handleChangeThumbnailAltText} />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col width={12}>
                    <Select options={options} value={selectedOptions} onChange={this.handleChangeTags as any} isMulti={true} />
                </Col>
            </Row>
            <FormGroup>
                <Label>Content:</Label>
                <Input type="textarea" value={content} onChange={this.handleChangeContent} style={{height: 400}} />
            </FormGroup>
        </Form>
    }
}