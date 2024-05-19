import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Colors from '../../theme/Colors';
import SearchIcon from '../../assets/svg/search.svg';

interface Tag {
  IconUrl: string;
  Id: number;
  Name: string;
  Rank: number;
}

interface TagBoxProps {
  data: Tag[];
  onPressItem: (itemId: number) => void;
}

const TagBox: React.FC<TagBoxProps> = ({data, onPressItem}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredData = data
    .filter(tag => tag.Name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => a.Rank - b.Rank);

  return (
    <View style={styles.mainContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <SearchIcon height={20} width={20} fill={Colors.black} />
          <TextInput
            style={styles.searchBox}
            placeholder="Ara..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.text}
          />
        </View>
        {filteredData.map(item => (
          <TouchableOpacity
            key={item.Id}
            style={styles.tagBox}
            onPress={() => onPressItem(item.Id)}>
            <Image source={{uri: item.IconUrl}} style={styles.icon} />
            <Text style={styles.tagName}>{item.Name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 2.5,
    height: 35,
    width: 100,
    paddingHorizontal: 5,
    marginHorizontal: 2,
    backgroundColor: Colors.white,
  },
  searchBox: {
    flex: 1,
    paddingLeft: 10,
    color: Colors.black,
    fontSize: 12,
  },
  tagBox: {
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 2.5,
    height: 35,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginHorizontal: 2,
    paddingHorizontal: 5,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  icon: {
    width: 24,
    height: 24,
    alignSelf: 'center',
    margin: 6,
    borderRadius: 5,
  },
  tagName: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.text,
    marginRight: 5,
  },
});

export default TagBox;
