import { Image, Text, TouchableOpacity } from 'react-native'      
import React, { useEffect } from 'react'
import { MenuItem } from '@/type'
import { appwriteConfig } from '@/lib/appwrite'

const MenuCard = ({item: {image_url, name, price}}: {item: MenuItem}) => {
    const imageUrl = `${image_url}&mode=admin`;                               

  useEffect(() => {
    console.log("Image URL:", imageUrl);
  }, [imageUrl]);
  
    return (
    <TouchableOpacity>    
        <Image source={{uri: imageUrl}} className='size-32 absolute -top-10' resizeMode='contain' />
        <Text className='text-center base-bold text-dark-100 mb-2' numberOfLines={1}>{name}</Text>
        <Text className='body-regularmb-4 text-gray-200'>From {price}</Text>
        <TouchableOpacity onPress={() => {
            console.log("Add to Cart");
        }}>
            <Text className='paragraph-semibold text-primary'>Add to Cart</Text>
        </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default MenuCard