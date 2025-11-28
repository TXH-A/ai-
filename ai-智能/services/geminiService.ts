import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Strips the data:image/...;base64, prefix from a base64 string
 */
const cleanBase64 = (base64Str: string): string => {
  const parts = base64Str.split(',');
  return parts.length > 1 ? parts[1] : base64Str;
};

/**
 * Generates a virtual try-on image using Gemini
 */
export const generateTryOn = async (
  personBase64: string,
  clothesBase64: string
): Promise<string> => {
  try {
    const cleanedPerson = cleanBase64(personBase64);
    const cleanedClothes = cleanBase64(clothesBase64);

    const prompt = `
      You are a professional fashion photographer and digital artist specializing in virtual try-on technology.
      
      **Task:**
      Generate a masterpiece quality, ultra-photorealistic FULL-BODY image of the person from the first image wearing the clothing from the second image.

      **Strict Requirements:**
      1. **Full Body Composition**: The output MUST be a full-body shot showing the person from head to toe. If the original photo is cropped, intelligently extend the legs and feet to create a complete look.
      2. **Perfect Fit**: The clothing must drape naturally over the person's specific body shape. Pay attention to fabric physics, wrinkles, tension, and gravity. It should look like they are actually wearing it, not just a sticker on top.
      3. **Identity Preservation**: Preserve the person's face, hair, skin tone, pose, and facial expression exactly.
      4. **High Fidelity**: The image should be 8k resolution, sharp focus, with cinematic lighting. Texture details of the fabric (cotton, silk, denim, etc.) must be visible.
      5. **Lighting Consistency**: The lighting on the clothing must match the lighting on the person's face and the environment.

      Output ONLY the generated image.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/png',
              data: cleanedPerson
            }
          },
          {
            inlineData: {
              mimeType: 'image/png',
              data: cleanedClothes
            }
          },
          {
            text: prompt
          }
        ]
      }
    });

    // Iterate through parts to find the image
    const parts = response.candidates?.[0]?.content?.parts;
    
    if (!parts) {
      throw new Error("生成失败：未返回任何内容。");
    }

    let generatedImageUrl = "";

    for (const part of parts) {
      if (part.inlineData) {
        const base64EncodeString: string = part.inlineData.data;
        generatedImageUrl = `data:image/png;base64,${base64EncodeString}`;
        break; 
      }
    }

    if (!generatedImageUrl) {
      // If only text was returned, it might be a refusal or error message
      const textPart = parts.find(p => p.text);
      if (textPart) {
         throw new Error(`AI 生成失败: ${textPart.text}`);
      }
      throw new Error("未找到生成的图像数据。");
    }

    return generatedImageUrl;

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "生成图片时发生错误，请重试。");
  }
};