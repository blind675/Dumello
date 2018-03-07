//
//  PlayerManager.h
//  Dumello
//
//  Created by Catalin-Andrei BORA on 2/20/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#ifndef PlayerManager_h
#define PlayerManager_h


#endif /* PlayerManager_h */

#import <React/RCTBridgeModule.h>
#import <AVFoundation/AVFoundation.h>

@interface PlayerManager : NSObject <RCTBridgeModule, AVAudioPlayerDelegate>

@property (strong, nonatomic) AVAudioPlayer *audioPlayer;
@property (strong, nonatomic) NSString *state;
@property (strong, nonatomic) NSString *error;


@end
