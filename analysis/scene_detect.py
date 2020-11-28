from scenedetect import VideoManager
from scenedetect import SceneManager
from scenedetect import StatsManager
from scenedetect.detectors import ContentDetector
import os


STATS_FILE_PATH = 'test_stat.csv'

def find_scenes(video_path, threshold=15.0):
    video_manager = VideoManager([video_path])
    scene_manager = SceneManager()
    stats_manager = StatsManager()
    scene_manager.add_detector(
        ContentDetector(threshold=threshold))

    # Base timestamp at frame 0 (required to obtain the scene list).
    base_timecode = video_manager.get_base_timecode()

    # Improve processing speed by downscaling before processing.
    video_manager.set_downscale_factor()

    # Start the video manager and perform the scene detection.
    video_manager.start()
    scene_manager.detect_scenes(frame_source=video_manager)
    scene_list = scene_manager.get_scene_list(base_timecode)
    timeline = []
    
    print('List of scenes obtained:')
    for i, scene in enumerate(scene_list):
        print(scene[1].get_timecode())
        timeline.append(scene[1].get_timecode())

    # Each returned scene is a tuple of the (start, end) timecode.
    return scene_manager.get_scene_list(base_timecode), timeline


