import React from 'react';
import PropTypes from 'prop-types';
import SaveIcon from '@material-ui/icons/GetApp';
import MediaViewerFooterButton from './MediaViewerFooterButton';
import FileStore from '../../Stores/FileStore';
import './MediaViewerFooterButton.css';

const iconStyle = {
    padding: 20,
    color: 'white'
};

class MediaViewerDownloadButton extends React.Component {
    constructor(props) {
        super(props);

        const { fileId } = props;

        this.state = {
            prevPropsFileId: fileId,
            fileId: fileId,
            disabled: MediaViewerDownloadButton.saveDisabled(fileId)
        };
    }

    static getDerivedStateFromProps(props, state) {
        const { fileId } = props;
        const { prevPropsFileId } = state;

        if (fileId !== prevPropsFileId) {
            return {
                prevPropsFileId: fileId,
                fileId: fileId,
                disabled: MediaViewerDownloadButton.saveDisabled(fileId)
            };
        }

        return null;
    }

    componentDidMount() {
        FileStore.on('clientUpdateUserBlob', this.onClientUpdateUserBlob);
        FileStore.on('clientUpdateChatBlob', this.onClientUpdateChatBlob);
        FileStore.on('clientUpdatePhotoBlob', this.onClientUpdatePhotoBlob);
        FileStore.on('clientUpdateVideoBlob', this.onClientUpdateVideoBlob);
    }

    componentWillUnmount() {
        FileStore.removeListener('clientUpdateUserBlob', this.onClientUpdateUserBlob);
        FileStore.removeListener('clientUpdateChatBlob', this.onClientUpdateChatBlob);
        FileStore.removeListener('clientUpdatePhotoBlob', this.onClientUpdatePhotoBlob);
        FileStore.removeListener('clientUpdateVideoBlob', this.onClientUpdateVideoBlob);
    }

    onClientUpdateUserBlob = update => {
        const { fileId } = this.state;

        if (fileId === update.fileId) {
            this.setState({
                disabled: MediaViewerDownloadButton.saveDisabled(fileId)
            });
        }
    };

    onClientUpdateChatBlob = update => {
        const { fileId } = this.state;

        if (fileId === update.fileId) {
            this.setState({
                disabled: MediaViewerDownloadButton.saveDisabled(fileId)
            });
        }
    };

    onClientUpdatePhotoBlob = update => {
        const { fileId } = this.state;

        if (fileId === update.fileId) {
            this.setState({
                disabled: MediaViewerDownloadButton.saveDisabled(fileId)
            });
        }
    };

    onClientUpdateVideoBlob = update => {
        const { fileId } = this.state;

        if (fileId === update.fileId) {
            this.setState({
                disabled: MediaViewerDownloadButton.saveDisabled(fileId)
            });
        }
    };

    static saveDisabled = fileId => {
        return !Boolean(FileStore.getBlob(fileId));
    };

    handleClick = event => {
        event.stopPropagation();

        const { onClick } = this.props;
        const { disabled } = this.state;
        if (disabled) return;

        onClick(event);
    };

    render() {
        const { title } = this.props;
        const { disabled } = this.state;

        return (
            <MediaViewerFooterButton disabled={disabled} title={title} onClick={this.handleClick}>
                <SaveIcon style={iconStyle} />
            </MediaViewerFooterButton>
        );
    }
}

MediaViewerDownloadButton.propTypes = {
    fileId: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string
};

export default MediaViewerDownloadButton;