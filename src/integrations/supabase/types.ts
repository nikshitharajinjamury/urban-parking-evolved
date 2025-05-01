export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      booking_services: {
        Row: {
          booking_id: string | null
          created_at: string | null
          id: string
          service_id: string | null
          status: Database["public"]["Enums"]["service_status"]
          updated_at: string | null
        }
        Insert: {
          booking_id?: string | null
          created_at?: string | null
          id?: string
          service_id?: string | null
          status?: Database["public"]["Enums"]["service_status"]
          updated_at?: string | null
        }
        Update: {
          booking_id?: string | null
          created_at?: string | null
          id?: string
          service_id?: string | null
          status?: Database["public"]["Enums"]["service_status"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_services_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_services_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          created_at: string | null
          end_time: string
          id: string
          payment_intent_id: string | null
          payment_status: string | null
          slot_id: string | null
          start_time: string
          status: Database["public"]["Enums"]["booking_status"]
          total_amount: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          end_time: string
          id?: string
          payment_intent_id?: string | null
          payment_status?: string | null
          slot_id?: string | null
          start_time: string
          status?: Database["public"]["Enums"]["booking_status"]
          total_amount?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          end_time?: string
          id?: string
          payment_intent_id?: string | null
          payment_status?: string | null
          slot_id?: string | null
          start_time?: string
          status?: Database["public"]["Enums"]["booking_status"]
          total_amount?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_slot_id_fkey"
            columns: ["slot_id"]
            isOneToOne: false
            referencedRelation: "parking_slots"
            referencedColumns: ["id"]
          },
        ]
      }
      driver_profiles: {
        Row: {
          availability: string[] | null
          created_at: string | null
          driver_license: string | null
          experience: string | null
          id: string
          status: string | null
          updated_at: string | null
          vehicle_model: string | null
          vehicle_year: string | null
        }
        Insert: {
          availability?: string[] | null
          created_at?: string | null
          driver_license?: string | null
          experience?: string | null
          id: string
          status?: string | null
          updated_at?: string | null
          vehicle_model?: string | null
          vehicle_year?: string | null
        }
        Update: {
          availability?: string[] | null
          created_at?: string | null
          driver_license?: string | null
          experience?: string | null
          id?: string
          status?: string | null
          updated_at?: string | null
          vehicle_model?: string | null
          vehicle_year?: string | null
        }
        Relationships: []
      }
      parking_locations: {
        Row: {
          address: string
          city: string
          created_at: string | null
          id: string
          image_url: string | null
          latitude: number
          longitude: number
          name: string
          total_slots: number
          updated_at: string | null
        }
        Insert: {
          address: string
          city: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          latitude: number
          longitude: number
          name: string
          total_slots?: number
          updated_at?: string | null
        }
        Update: {
          address?: string
          city?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          latitude?: number
          longitude?: number
          name?: string
          total_slots?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      parking_slots: {
        Row: {
          created_at: string | null
          id: string
          location_id: string | null
          name: string
          price_per_hour: number
          status: Database["public"]["Enums"]["slot_status"]
          type: Database["public"]["Enums"]["slot_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          location_id?: string | null
          name: string
          price_per_hour?: number
          status?: Database["public"]["Enums"]["slot_status"]
          type?: Database["public"]["Enums"]["slot_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          location_id?: string | null
          name?: string
          price_per_hour?: number
          status?: Database["public"]["Enums"]["slot_status"]
          type?: Database["public"]["Enums"]["slot_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "parking_slots_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "parking_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          first_name: string | null
          id: string
          is_driver: boolean | null
          last_name: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          first_name?: string | null
          id: string
          is_driver?: boolean | null
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          first_name?: string | null
          id?: string
          is_driver?: boolean | null
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          description: string | null
          estimated_time: number
          id: string
          image_url: string | null
          name: string
          price: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          estimated_time?: number
          id?: string
          image_url?: string | null
          name: string
          price?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          estimated_time?: number
          id?: string
          image_url?: string | null
          name?: string
          price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      booking_status: "pending" | "confirmed" | "completed" | "cancelled"
      service_status: "pending" | "in_progress" | "completed"
      slot_status: "available" | "occupied" | "maintenance"
      slot_type: "standard" | "premium" | "valet"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      booking_status: ["pending", "confirmed", "completed", "cancelled"],
      service_status: ["pending", "in_progress", "completed"],
      slot_status: ["available", "occupied", "maintenance"],
      slot_type: ["standard", "premium", "valet"],
    },
  },
} as const
