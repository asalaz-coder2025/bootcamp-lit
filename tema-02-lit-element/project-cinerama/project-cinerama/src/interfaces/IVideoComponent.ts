export type VideoSourceType = 'youtube' | 'mp4';

export default interface IVideoComponent{
    videoDescription: String,
    videoName: String,
    videoDuration: String,
    videoType: VideoSourceType
}