//
//  PlayerManager.m
//  Dumello
//
//  Created by Catalin-Andrei BORA on 2/20/18.
//  Copyright © 2018 Facebook. All rights reserved.
//
#import "PlayerManager.h"

#import <Foundation/Foundation.h>
#import <React/RCTLog.h>

@implementation PlayerManager

RCT_EXPORT_MODULE();

- (instancetype)init
{
  self = [super init];
  if (self) {
    AVAudioSession *session = [AVAudioSession sharedInstance];
    [session setCategory:AVAudioSessionCategoryPlayback error:nil];
    _state=@"NOT_INITIALIZED";
    _error=@"";
  }
  return self;
}

RCT_EXPORT_METHOD(play:(NSString *)url)
{
  RCTLogInfo(@"Preparing to play url: %@ - native", url);
  
  NSData *_objectData = [NSData dataWithContentsOfURL:[NSURL URLWithString:url]];
  NSError *error;
  
  _audioPlayer = [[AVAudioPlayer alloc] initWithData:_objectData error:&error];
  _state=@"INITIALIZED";
  _audioPlayer.numberOfLoops = 0;
  _audioPlayer.volume = 1.0f;
  [_audioPlayer setDelegate:self];
  [_audioPlayer prepareToPlay];
  _state=@"PREPARING_TO_PLAY";
  _error=@"";
  
  if (_audioPlayer == nil) {
    NSLog(@"%@", [error description]);
    _state=@"ERROR";
    _error=[error description];
  }
  else
    [_audioPlayer play];
}

RCT_EXPORT_METHOD(getStatus:(RCTResponseSenderBlock)callback)
{
  if (_audioPlayer.isPlaying)
    _state = @"PLAYING";
  
  NSDictionary *info = @{
                         @"status": _state,
                         @"duration": @(_audioPlayer.duration),
                         @"progress": @(_audioPlayer.currentTime),
                         };
  if ([_error  isEqual: @""]) {
    callback(@[[NSNull null], info]);
  } else {
    callback(@[_error, info]);
  }
}

RCT_EXPORT_METHOD(stop)
{
  _state = @"STOPED";
  [_audioPlayer stop];
}

- (void) audioPlayerDidFinishPlaying:(AVAudioPlayer *)player successfully:(BOOL)flag{
  // TODO: trow event
  NSLog(@"- Finish plaing with flag: %d",flag);
  _state = @"STOPED";
}

- (void) audioPlayerDecodeErrorDidOccur:(AVAudioPlayer *)player error:(NSError *)error {
  // TODO: trow event
  NSLog(@"- Audio player error: %@",error);
  _state=@"ERROR";
  _error=[error description];
}

@end
