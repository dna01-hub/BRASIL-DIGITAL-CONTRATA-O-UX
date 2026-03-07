export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      pedidos: {
        Row: {
          agendamento_data: string | null
          agendamento_horario_id: string | null
          agendamento_horario_label: string | null
          analise_status: string | null
          apartamento: string | null
          api_response: Json | null
          apps: Json | null
          bairro: string | null
          bloco: string | null
          celular: string | null
          cep: string | null
          cidade: string | null
          complemento: string | null
          condominio_id: string | null
          condominio_nome: string | null
          cpf_cnpj: string | null
          cpf_responsavel: string | null
          created_at: string | null
          data_nascimento: string | null
          email: string | null
          estado: string | null
          forma_pagamento: string | null
          id: string
          latitude: number | null
          logradouro: string | null
          longitude: number | null
          nome: string | null
          nome_responsavel: string | null
          numero: string | null
          plano_id: number | null
          plano_nome: string | null
          plano_preco: number | null
          plano_velocidade: number | null
          razao_social: string | null
          servicos_adicionais: Json | null
          status: string | null
          taxa_ativacao: number | null
          telefone: string | null
          tipo_endereco: string | null
          tipo_pessoa: string | null
          vencimento: string | null
        }
        Insert: {
          agendamento_data?: string | null
          agendamento_horario_id?: string | null
          agendamento_horario_label?: string | null
          analise_status?: string | null
          apartamento?: string | null
          api_response?: Json | null
          apps?: Json | null
          bairro?: string | null
          bloco?: string | null
          celular?: string | null
          cep?: string | null
          cidade?: string | null
          complemento?: string | null
          condominio_id?: string | null
          condominio_nome?: string | null
          cpf_cnpj?: string | null
          cpf_responsavel?: string | null
          created_at?: string | null
          data_nascimento?: string | null
          email?: string | null
          estado?: string | null
          forma_pagamento?: string | null
          id?: string
          latitude?: number | null
          logradouro?: string | null
          longitude?: number | null
          nome?: string | null
          nome_responsavel?: string | null
          numero?: string | null
          plano_id?: number | null
          plano_nome?: string | null
          plano_preco?: number | null
          plano_velocidade?: number | null
          razao_social?: string | null
          servicos_adicionais?: Json | null
          status?: string | null
          taxa_ativacao?: number | null
          telefone?: string | null
          tipo_endereco?: string | null
          tipo_pessoa?: string | null
          vencimento?: string | null
        }
        Update: {
          agendamento_data?: string | null
          agendamento_horario_id?: string | null
          agendamento_horario_label?: string | null
          analise_status?: string | null
          apartamento?: string | null
          api_response?: Json | null
          apps?: Json | null
          bairro?: string | null
          bloco?: string | null
          celular?: string | null
          cep?: string | null
          cidade?: string | null
          complemento?: string | null
          condominio_id?: string | null
          condominio_nome?: string | null
          cpf_cnpj?: string | null
          cpf_responsavel?: string | null
          created_at?: string | null
          data_nascimento?: string | null
          email?: string | null
          estado?: string | null
          forma_pagamento?: string | null
          id?: string
          latitude?: number | null
          logradouro?: string | null
          longitude?: number | null
          nome?: string | null
          nome_responsavel?: string | null
          numero?: string | null
          plano_id?: number | null
          plano_nome?: string | null
          plano_preco?: number | null
          plano_velocidade?: number | null
          razao_social?: string | null
          servicos_adicionais?: Json | null
          status?: string | null
          taxa_ativacao?: number | null
          telefone?: string | null
          tipo_endereco?: string | null
          tipo_pessoa?: string | null
          vencimento?: string | null
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
