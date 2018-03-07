import React from 'react';
import { View } from 'react-native';
import DefaultTags from './DefaultTags';
import Tag from './Tag';

/* <TagCloud 
    tags={['Blonde', 'Evrei']} 
    selectedTags={['Blonde']}
    unselectable
    onValueChanged={(selectedTags) => {
        console.log('selectedTags:', selectedTags);
    }}
/> */

const TagCloud = ({ onValueChanged, selectedTags = [], tags = DefaultTags, unselectable = false, small = false, backgroundColor }) => {
    const tagsElements = [];
    for (let i = 0; i < tags.length; i++) {
        const isSelected = selectedTags.indexOf(tags[i]) !== -1;
        tagsElements.push(
            <Tag
                small={small}
                backgroundColor={backgroundColor}
                selected={isSelected}
                unselectable={unselectable}
                key={i}
                onSelect={(selected) => {
                    if (selected) {
                        const index = selectedTags.indexOf(tags[i]);
                        if (index > -1) {
                            selectedTags.splice(index, 1);
                        }
                    } else {
                        selectedTags.push(tags[i]);
                    } 
                    if (onValueChanged) {
                        onValueChanged(selectedTags);
                    }
                }}
            >
                {tags[i]}
            </Tag>
        );
    }

    return (
        <View
            style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
            }}
        >
            {tagsElements}
        </View>
    );
};

export default TagCloud;
