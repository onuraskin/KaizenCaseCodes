import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useNavigation, RouteProp} from '@react-navigation/native';
import Colors from '../theme/Colors';
import convertHtmlToReact from '../utils/convertHtmlToReact';
import BackButton from '../assets/svg/backbutton.svg';
import PromotionService from '../services/PromotionService';

interface Promotion {
  BrandIconUrl: string;
  Description: string;
  ImageUrl: string;
}

type RootStackParamList = {
  DetailPage: {itemId: number};
};

type DetailPageRouteProp = RouteProp<RootStackParamList, 'DetailPage'>;

interface DetailPageProps {
  route: DetailPageRouteProp;
}

const DetailPage: React.FC<DetailPageProps> = ({route}) => {
  const navigation = useNavigation();
  const {itemId} = route.params || {};
  const [promotion, setPromotion] = useState<Promotion | null>(null);

  useEffect(() => {
    const fetchPromotionById = async (id: number) => {
      try {
        const promotionData = await PromotionService.getPromotion(id);
        setPromotion(promotionData);
      } catch (error) {
        console.error('Error fetching promotion by id:', error);
      }
    };

    fetchPromotionById(itemId);
  }, [itemId]);

  const getImageSize = () => {
    const windowWidth = Dimensions.get('window').width;
    return {
      width: windowWidth,
      height: windowWidth * 0.7, // Önerilen oranı korumak için uygun bir oran kullanabilirsiniz
    };
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <BackButton height={40} width={40} fill={Colors.black} />
        </TouchableOpacity>
        {promotion ? (
          <>
            <Image
              source={{uri: promotion.ImageUrl}}
              style={[styles.promotionImage, getImageSize()]}
            />
            <View style={styles.brandIconContainer}>
              <Image
                source={{uri: promotion.BrandIconUrl}}
                style={styles.brandIcon}
              />
            </View>
            <View style={styles.descriptionContainer}>
              {convertHtmlToReact(promotion.Description, 300)}
            </View>
          </>
        ) : (
          <Text style={styles.loading}>Loading...</Text>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinButtonText}>Hemen Katil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
  promotionImage: {
    borderBottomEndRadius: 16,
    borderBottomLeftRadius: 100,
    borderBottomColor: 'transparent',
    backgroundColor: 'red',
  },
  brandIconContainer: {
    position: 'absolute',
    alignSelf: 'center',
    left: 25,
    marginTop: 200,
    backgroundColor: Colors.white,
    padding: 5,
    borderRadius: 55,
  },
  brandIcon: {
    width: 55,
    height: 55,
    borderRadius: 55,
  },
  descriptionContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  loading: {
    marginTop: 16,
    fontSize: 16,
    color: 'gray',
  },
  joinButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 60,
    width: '90%',
    backgroundColor: Colors.red,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 25,
    marginHorizontal: 25,
  },
  joinButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default DetailPage;
