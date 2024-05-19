import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PromotionsListService from '../services/PromotionsListService';
import TagsService from '../services/TagsService';
import CustomHeader from '../components/CustomHeader';
import TagBox from '../components/MainPage/Tagbox';
import Carousel from 'react-native-reanimated-carousel';
import Colors from '../theme/Colors';
import convertHtmlToReact from '../utils/convertHtmlToReact';
import {calculateRemainingDays} from '../utils/calculate'; // Date utils'ı içeri aktar

interface Tag {
  IconUrl: string;
  Id: number;
  Name: string;
  Rank: number;
}

interface Promotion {
  BrandIconUrl: string;
  Id: number;
  ImageUrl: string;
  SeoName: string;
  Title: string;
  Unvisible: boolean;
  RemainingText: string; // RemainingText alanı eklendi
}

const {width, height} = Dimensions.get('window');

const MainPage: React.FC = () => {
  const navigation = useNavigation();
  const [tags, setTags] = useState<Tag[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTags: Tag[] = await TagsService.getTags();
        setTags(fetchedTags);

        const fetchedPromotions: Promotion[] =
          await PromotionsListService.getPromotionsList();
        setPromotions(fetchedPromotions);
      } catch (error) {
        console.error('Error fetching tags or promotions:', error);
      }
    };

    fetchData();
  }, []);

  const handlePressItem = (itemId: number, SeoName: string) => {
    navigation.navigate('Detail', {itemId});
  };

  const renderPagination = () => {
    return (
      <View style={styles.pagination}>
        {promotions.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              {
                backgroundColor:
                  activeIndex === index ? Colors.red : Colors.secondary,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader />
      <TagBox data={tags} onPressItem={() => {}} />
      <Carousel
        style={{marginTop: 15}}
        width={width}
        height={height / 1.65}
        data={promotions.filter(promotion => !promotion.Unvisible)}
        onScrollEnd={index => setActiveIndex(index)}
        renderItem={({item}) => (
          <View style={styles.carouselItem}>
            <TouchableOpacity
              style={styles.carouselContainer}
              activeOpacity={1}
              onPress={() => handlePressItem(item.Id, item.SeoName)}>
              <Image
                source={{uri: item.ImageUrl}}
                style={styles.promotionImage}
              />
              <View style={styles.brandIconContainer}>
                <Image
                  source={{uri: item.BrandIconUrl}}
                  style={styles.brandIcon}
                />
              </View>
              <View style={styles.textOfBrand}>
                {convertHtmlToReact(item.Title)}
              </View>
              {item.RemainingText && (
                <View style={styles.remainingContainer}>
                  <Text style={styles.remainingText}>
                    {calculateRemainingDays(item.RemainingText)}
                  </Text>
                </View>
              )}
              <Text
                style={{
                  position: 'absolute',
                  bottom: 35,
                  fontWeight: 700,
                  color: Colors.red,
                  alignSelf: 'center',
                }}>
                Daha Daha
              </Text>
              <View style={styles.triangle}></View>
            </TouchableOpacity>
          </View>
        )}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 90,
        }}
      />
      {renderPagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  carouselItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  carouselContainer: {
    width: '100%',
    height: '100%',
    padding: 20,
  },
  textOfBrand: {
    height: 50,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  promotionImage: {
    width: '90%',
    height: '100%',
    borderRadius: 16,
    borderBottomLeftRadius: 100,
    borderBottomColor: 'transparent',
    backgroundColor: 'red',
  },
  brandIcon: {
    width: 55,
    height: 55,
    borderRadius: 55,
  },
  brandIconContainer: {
    position: 'absolute',
    left: 20,
    bottom: 50,
    backgroundColor: Colors.white,
    padding: 5,
    borderRadius: 55,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 15,
    borderRightWidth: 10,
    borderBottomWidth: 0,
    borderLeftWidth: 275,
    borderTopColor: 'red',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  remainingContainer: {
    alignItems: 'center',
    position: 'absolute',
    height: 35,
    width: 100,
    right: 50,
    borderRadius: 25,
    bottom: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
  },
  remainingText: {
    color: 'white',
    alignItems: 'center',
    fontSize: 12,
    fontWeight: '400',
    alignSelf: 'center',
  },
  pagination: {
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 30,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
});

export default MainPage;
