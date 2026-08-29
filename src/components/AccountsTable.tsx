import type { AccountBalance } from "../types/assets";
import { formatKRW } from "../lib/format";
import { pickAccountIcon } from "./assetIcons";

interface Props {
  accounts: AccountBalance[];
  total: number;
}

export default function AccountsTable({ accounts, total }: Props) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>계좌</th>
            <th>비고</th>
            <th style={{ textAlign: "right" }}>잔액</th>
            <th style={{ textAlign: "right" }}>비중</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc) => {
            const Icon = pickAccountIcon(acc.name);
            return (
              <tr key={acc.name}>
                <td className="cell-strong">
                  {Icon && <Icon className="account-icon" />}
                  {acc.name}
                </td>
                <td className="cell-muted">{acc.note ?? "—"}</td>
                <td style={{ textAlign: "right" }}>{formatKRW(acc.amount)}</td>
                <td style={{ textAlign: "right" }}>
                  {total > 0 ? ((acc.amount / total) * 100).toFixed(1) : "0.0"}%
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td className="cell-strong">합계</td>
            <td />
            <td style={{ textAlign: "right" }} className="cell-strong">
              {formatKRW(total)}
            </td>
            <td style={{ textAlign: "right" }}>100.0%</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
